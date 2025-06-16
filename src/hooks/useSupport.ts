import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { supportService } from '../services/supportService';
import type { SupportTicket } from '../types/support';

export const useSupport = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const createTicket = useCallback(async (input: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'comments'>) => {
    if (!user) {
      setError('You must be logged in to create a ticket');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const newTicket = await supportService.createTicket(input, user.id);
      setTickets(prev => [...prev, newTicket]);
      return newTicket;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create ticket');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateTicket = useCallback(async (ticketId: string, updates: Partial<SupportTicket>) => {
    if (!user) {
      setError('You must be logged in to update a ticket');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const updatedTicket = await supportService.updateTicket(ticketId, updates);
      setTickets(prev => prev.map(ticket => 
        ticket.id === ticketId ? updatedTicket : ticket
      ));
      return updatedTicket;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update ticket');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addComment = useCallback(async (ticketId: string, content: string) => {
    if (!user) {
      setError('You must be logged in to add a comment');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await supportService.addComment(ticketId, user.id, content);
      // Fetch the updated ticket with the new comment
      const updatedTicket = await supportService.getTicket(ticketId);
      setTickets(prev => prev.map(ticket => 
        ticket.id === ticketId ? updatedTicket : ticket
      ));
      return updatedTicket;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add comment');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    tickets,
    error,
    loading,
    createTicket,
    updateTicket,
    addComment,
  };
}; 