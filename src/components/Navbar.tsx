import { Box, Link, Icon } from '@chakra-ui/react'
import { CgHome, CgStack, CgToday } from "react-icons/cg";
import { Link as NavLink, useLocation } from "react-router-dom";

export const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <Box bg='red.500' w='calc(100% - 24px*2)' py={4} px={6} mx='auto' mt={4} borderRadius='99em' display="flex" alignItems="center" justifyContent='space-between'>
      <Link as={NavLink} to='/Pokemon-TCG-Pokedex' display="inline-flex" alignItems="center" color={pathname === '/' ? 'yellow' : 'white'}><Icon as={CgHome} mr={2} />首頁</Link>
      <Box>
        <Link as={NavLink} to='sets' ml={4} display="inline-flex" alignItems="center" color={pathname === '/sets' ? 'yellow' : 'white'}><Icon as={CgStack} mr={2} />系列查詢</Link>
        <Link as={NavLink} to='deck' ml={4} display="inline-flex" alignItems="center" color={pathname === '/deck' ? 'yellow' : 'white'}><Icon as={CgToday} mr={2} />我的牌組</Link>
      </Box>
    </Box>
  );
}