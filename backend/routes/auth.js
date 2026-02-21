
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authRepositorio } from '../GerenciadoresDeDados/auth.repositorio.js';
import { gerarId, ID_PREFIX } from '../ServiçosBackEnd/idService.js';

const router = express.Router();

// Rota de Registro
router.post('/register', async (req, res) => {
    const { name, username, email, password, googleId } = req.body;

    try {
        if (await authRepositorio.findByEmail(email)) {
            return res.status(409).json({ message: 'O e-mail fornecido já está em uso.' });
        }
        if (await authRepositorio.findByUsername(username)) {
            return res.status(409).json({ message: 'O nome de usuário já está em uso.' });
        }

        const novoUsuarioId = gerarId(ID_PREFIX.USUARIO);
        const passwordHash = password ? await bcrypt.hash(password, 10) : null;

        const newUser = { id: novoUsuarioId, name, username, email, passwordHash, googleId };
        await authRepositorio.create(newUser);

        const token = jwt.sign({ userId: novoUsuarioId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ 
            message: 'Usuário registrado com sucesso!', 
            token, 
            userId: novoUsuarioId 
        });

    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({ message: 'Ocorreu um erro inesperado durante o registro.' });
    }
});

// Rota de Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authRepositorio.findByEmail(email);
        if (!user || !user.passwordHash) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login bem-sucedido!', token, userId: user.id });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Ocorreu um erro inesperado durante o login.' });
    }
});

// Rota de autenticação com Google
router.post('/auth/google', async (req, res) => {
    const { googleId, email, name } = req.body;

    try {
        let user = await authRepositorio.findByGoogleId(googleId);

        if (!user) {
            user = await authRepositorio.findByEmail(email);
            if (user) {
                user.googleId = googleId;
                await authRepositorio.update(user); // Vincula o Google ID
            } else {
                const novoUsuarioId = gerarId(ID_PREFIX.USUARIO);
                const username = email.split('@')[0];
                
                const newUser = { id: novoUsuarioId, googleId, email, name, username, passwordHash: null };
                user = await authRepositorio.create(newUser);
            }
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Autenticação com Google bem-sucedida!', token, userId: user.id });

    } catch (error) {
        console.error('Erro na autenticação com Google:', error);
        res.status(500).json({ message: 'Ocorreu um erro inesperado durante a autenticação com o Google.' });
    }
});

export default router;
