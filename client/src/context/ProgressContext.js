import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const ProgressContext = createContext(null);
export const useProgress = () => { return useContext(ProgressContext); };

export const ProgressProvider = ({ children }) => {
    const [learningState, setLearningState] = useState(null);
    const [loading, setLoading] = useState(true);
    const { userInfo } = useAuth();

    const fetchLearningState = async () => {
        if (!userInfo) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const { data } = await api.get('/learning/profile');
            setLearningState(data);
        } catch (error) {
            console.error("Failed to fetch learning state", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLearningState();
    }, [userInfo]);

    const recordLearningEvent = async (skill, wasCorrect) => {
        try {
            await api.post('/learning/progress', { skill, wasCorrect });
            // Re-fetch the state to get the latest mastery scores
            fetchLearningState(); 
        } catch (error) {
            console.error("Failed to record learning event", error);
        }
    };

    const value = { learningState, loading, recordLearningEvent, refetch: fetchLearningState };
    
    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};