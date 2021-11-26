import React, { ChangeEvent, useState } from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

import Input, { InputProps } from './input';
import UserDetails from './user-details';
import useUsersSearch from '../utils/use-users-search';

const UsersSearch = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof ComboboxInput> & InputProps
>(({ onChange, ...props }, ref) => {
  const [query, setQuery] = useState('');
  const users = useUsersSearch(query);

  return (
    <Combobox aria-label="Users">
      <ComboboxInput
        {...props}
        as={Input}
        ref={ref}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChange && onChange(e);
          setQuery(e.target.value);
        }}
      />

      {users && (
        <ComboboxPopover className="bg-white rounded-lg border border-gray-200 p-2 mt-1">
          {users.length > 0 ? (
            <ComboboxList>
              {users.map((user) => {
                return (
                  <ComboboxOption
                    key={user.id}
                    value={user.username}
                    className="hover:bg-green-50 cursor-pointer py-2 px-3 rounded transition-colors"
                  >
                    <UserDetails user={user} />
                  </ComboboxOption>
                );
              })}
            </ComboboxList>
          ) : (
            <p className="text-gray-500 text-center">No results found</p>
          )}
        </ComboboxPopover>
      )}
    </Combobox>
  );
});

UsersSearch.displayName = 'UsersSearch';

export default UsersSearch;
