import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { deckList, initialDeckList } from '../store/modules/deckSlice';
import { Link as NavLink, useLocation } from "react-router-dom";
import { Box, Link, Icon, Badge } from '@chakra-ui/react'
import { CgHome, CgStack, CgToday } from "react-icons/cg";

export const Navbar = () => {
  // state
  const { pathname } = useLocation()
  const deck = useAppSelector(deckList);
  const totalCount = deck.map(item => item.quantity)
  const source = localStorage.getItem('deckList')

  // methods
  const dispatch = useAppDispatch();
  const countReducer = (accumulator: number, curr: number) => accumulator + curr;
  const getDeckTotalCount = () => {
    if (deck.length > 0) {
      return totalCount.reduce(countReducer)
    } else {
      return 0
    }
  }

  // hooks
  useEffect(() => {
    if (source) {
      dispatch(initialDeckList(JSON.parse(source)))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box bg='red.500' w='calc(100% - 24px*2)' py={4} px={6} mx='auto' mt={4} borderRadius='full' fontSize='sm' display="flex" alignItems="center" justifyContent='space-between'>
      <Link as={NavLink} to='/Pokemon-TCG-Pokedex' display="inline-flex" alignItems="center" color={pathname === '/' ? 'yellow' : 'white'}><Icon as={CgHome} mr={2} />首頁</Link>
      <Link as={NavLink} to='sets' ml='auto' display="inline-flex" alignItems="center" color={pathname === '/sets' ? 'yellow' : 'white'}><Icon as={CgStack} mr={2} />系列查詢</Link>
      <Link as={NavLink} to='deck' ml={['auto', 4]} display="inline-flex" alignItems="center" color={pathname === '/deck' ? 'yellow' : 'white'}><Icon as={CgToday} mr={2} />我的牌組<Badge ml={1} borderRadius='full' colorScheme='yellow'>{getDeckTotalCount()}</Badge></Link>
    </Box>
  );
}