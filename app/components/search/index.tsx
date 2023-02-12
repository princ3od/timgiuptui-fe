import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { SearchIcon } from '@chakra-ui/icons';
import { InputGroup, InputLeftElement, Input, Box, Highlight } from '@chakra-ui/react';

interface Props {
  initialQuery?: string;
  suggestions?: string[];
  onChanged: (searchText: string, suggest?: boolean) => void;
}

const SearchBar = (pageProps: Props) => {
  const router = useRouter();
  const { suggestions = [], onChanged, initialQuery } = pageProps;

  const [selected, setSelected] = useState<number>(-1);
  const [value, setValue] = useState<string>(initialQuery ?? '');
  const [typedValue, setTypedValue] = useState<string>('');

  useEffect(() => {
    onChanged(value, selected === -1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChanged = (e: any) => {
    e.preventDefault();
    setValue(e.target.value);
    setTypedValue(e.target.value);
    setSelected(-1);
    onChanged(value);
  };

  const handleKeyDown = (e: any) => {
    if (suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      const canMoveDown = selected < (suggestions?.length ?? 0) - 1;
      const selectedIndex = canMoveDown ? selected + 1 : -1;
      setSelected(selectedIndex);
      canMoveDown ? setValue(suggestions[selectedIndex]) : setValue(typedValue);
    }
    if (e.key === 'ArrowUp') {
      const canMoveUp = selected > 0;
      const selectedIndex = canMoveUp ? selected - 1 : suggestions?.length ?? -1;
      setSelected(selectedIndex);
      canMoveUp ? setValue(suggestions[selectedIndex]) : setValue(typedValue);
    }
    if (e.key === 'Enter' && selected > -1) {
      alert(suggestions[selected]);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    router.push(`/search?q=${suggestion}`);
  };

  const showSuggestions = suggestions.length > 0 && value.length > 0;

  return (
    <InputGroup
      my="20px"
      className="search-bar"
      flexDirection="column"
      borderRadius="8px"
      border="1px solid #E2E8F0"
      alignItems="flex-start"
    >
      <InputLeftElement height="48px" borderRadius="full">
        <SearchIcon />
      </InputLeftElement>
      <Input
        autoFocus
        value={value}
        type="search"
        border="none"
        placeholder="Nhập tin bạn muốn tìm kiếm..."
        size="lg"
        height="48px"
        borderBottom="1px solid #E2E8F0"
        borderRadius="8px"
        onChange={handleChanged}
        onKeyDown={handleKeyDown}
      />
      {showSuggestions &&
        suggestions.map((suggestion, index) => {
          const isSelected = index === selected;
          return (
            <Box
              as="a"
              px="4"
              py="2"
              key={index}
              width="100%"
              textAlign="left"
              fontSize="sm"
              cursor="pointer"
              display="flex"
              background={isSelected ? '#eceff1' : 'transparent'}
              onClick={() => selectSuggestion(suggestion)}
              _hover={{ background: '#eceff1' }}
            >
              <Box height="100%">
                <SearchIcon width="12px" height="12px" mr="2" />
              </Box>
              <span>
                <Highlight query={typedValue} styles={{ fontWeight: 'bold' }}>
                  {suggestion}
                </Highlight>
              </span>
            </Box>
          );
        })}
    </InputGroup>
  );
};

export default SearchBar;
