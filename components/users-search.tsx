import { ChangeEvent, useState } from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
// import '@reach/combobox/styles.css';

import Input from './input';
import useUsersSearch from '../utils/use-users-search';

const UsersSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const users = useUsersSearch(query);

  return (
    <Combobox aria-label="Cities">
      <ComboboxInput
        as={Input}
        placeholder="Search users"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
      />

      {users && (
        <ComboboxPopover className="bg-white rounded-lg border border-gray-200 p-2 mt-1">
          {users.length > 0 ? (
            <ComboboxList>
              {users.map((user) => {
                return <ComboboxOption key={user.id} value={user.name} />;
              })}
            </ComboboxList>
          ) : (
            <p className="text-gray-500 text-center">No results found</p>
          )}
        </ComboboxPopover>
      )}
    </Combobox>
  );
};

export default UsersSearch;
