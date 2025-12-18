import {useState, useEffect, useCallback} from 'react';
import {fetchAccount} from '@/api';
import {IAccount} from '@/types/api';

interface UseAccountOptions {
  enabled?: boolean;
}

interface UseAccountReturn {
  account: IAccount | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export const useAccount = (options: UseAccountOptions = {}): UseAccountReturn => {
  const {enabled = true} = options;

  const [account, setAccount] = useState<IAccount | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAccountData = useCallback(async () => {
    if (!enabled) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const accountData = await fetchAccount();
      setAccount(accountData);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch account');
      setError(error);
      console.error('Error fetching account:', error);
    } finally {
      setIsLoading(false);
    }
  }, [enabled]);

  const refresh = useCallback(async () => {
    await fetchAccountData();
  }, [fetchAccountData]);

  useEffect(() => {
    fetchAccountData();
  }, [fetchAccountData]);

  return {
    account,
    isLoading,
    error,
    refresh,
  };
};

