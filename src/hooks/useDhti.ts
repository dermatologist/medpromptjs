import { useState } from 'react';
import axios from 'axios';
import { CDSHookRequest } from '../models/request';
import { CDSHookCard } from '../models/card';

interface UseDhtiReturn {
  submitMessage: (
    newMessage: string,
    service?: string
  ) => Promise<CDSHookCard | null>;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook to handle DHTI service submissions
 * @returns Object with submitMessage function, loading state, and error state
 */
export const useDhti = (): UseDhtiReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submitMessage = async (
    newMessage: string,
    service: string = 'dhti_elixir_template'
  ): Promise<CDSHookCard | null> => {
    setLoading(true);
    setError(null);

    try {
      const request = new CDSHookRequest({
        context: { input: newMessage },
      });

      // TODO: Investigate why nested input is required
      const _request = {
        input: request,
      };

      const response = await axios.post(
        `${process.env.DHTI_ELIXIR_BASE || ''}/langserve/${service}/cds-services/dhti-service`,
        {
          input: _request,
          config: {},
          kwargs: {},
        }
      );

      // Assuming the response contains a card or cards
      if (
        response.data &&
        response.data.cards &&
        response.data.cards.length > 0
      ) {
        return CDSHookCard.from(response.data.cards[0]);
      } else if (response.data && response.data.summary) {
        // Handle case where response is directly a card (must have summary property)
        return CDSHookCard.from(response.data);
      }

      return null;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to submit message';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submitMessage, loading, error };
};
