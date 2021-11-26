import type { User } from '@prisma/client';
import { useEffect, useState } from 'react';

const useUsersSearch = (query: string) => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async (q: string) => {
    if (!q.trim()) return;

    const res = await fetch(
      `/api/users/search?q=${encodeURIComponent(q.trim())}`,
      { credentials: 'include' }
    );
    const { data } = await res.json();
    setUsers(data.users);
  };

  useEffect(() => {
    fetchUsers(query);
  }, [query]);

  return users;
};

export default useUsersSearch;
