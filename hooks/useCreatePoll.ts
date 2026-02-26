
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiçoPublicaçãoFeed } from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoFeed.js';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { Post, PollOption } from '../types';

export const useCreatePoll = (editingPost: Post | null) => {
    const navigate = useNavigate();
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState<PollOption[]>([{ id: '1', text: '' }, { id: '2', text: '' }]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (editingPost && editingPost.poll) {
            setQuestion(editingPost.poll.question);
            setOptions(editingPost.poll.options.map((opt, index) => ({ id: `${index + 1}`, text: opt.text, votes: opt.votes })) || []);
        }
    }, [editingPost]);

    const handleOptionChange = (id: string, text: string) => {
        const newOptions = options.map(option => option.id === id ? { ...option, text } : option);
        setOptions(newOptions);
    };

    const addOption = () => {
        if (options.length < 5) {
            setOptions([...options, { id: `${Date.now()}` , text: '' }]);
        }
    };

    const removeOption = (id: string) => {
        if (options.length > 2) {
            setOptions(options.filter(option => option.id !== id));
        }
    };

    const handleSubmit = async () => {
        if (question.trim() === '' || options.some(opt => opt.text.trim() === '')) {
            alert('Por favor, preencha a pergunta e todas as opções da enquete.');
            return;
        }

        setIsSubmitting(true);

        const postData = {
            content: question,
            type: 'poll',
            poll: {
                question,
                options: options.map(opt => ({ text: opt.text.trim(), votes: opt.votes || 0 }))
            },
            // Se for edição, precisamos passar o ID do post
            ...(editingPost && { postId: editingPost.id })
        };

        try {
            if (editingPost) {
                // Lógica de atualização (PUT)
                await ServiçoPublicaçãoFeed.updatePost(editingPost.id, postData);
            } else {
                // Lógica de criação (POST)
                await ServiçoPublicaçãoFeed.createPost(postData);
            }
            navigate('/'); // Redireciona para a home após sucesso
        } catch (error) {
            console.error("Erro ao criar/atualizar enquete:", error);
            alert('Ocorreu um erro. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        question,
        setQuestion,
        options,
        handleOptionChange,
        addOption,
        removeOption,
        handleSubmit,
        isSubmitting,
        canAddOption: options.length < 5,
        canRemoveOption: options.length > 2,
    };
};
