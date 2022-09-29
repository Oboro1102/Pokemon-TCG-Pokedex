import { Box, Text, Link } from '@chakra-ui/react'

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box bg='red.500' w='calc(100% - 24px*2)' py={4} px={6} mx='auto' mb={4} borderRadius='full' fontSize='xs' display='flex' alignItems='center' justifyContent='space-between' flexWrap='wrap'>
      <Text>所有資料來源使用自<Link ml={1} color='yellow' href='https://pokemontcg.io/' isExternal>Pokémon TCG API</Link>。本網站並非由任天堂或寶可夢公司製作、認可、支持或附屬。</Text>
      <Text>&copy; 2022{<span>{currentYear !== 2022 && `&nbsp;-&nbsp;${currentYear}`}</span>}&nbsp;Design & Coding by ツキノリュウ.</Text>
    </Box>
  );
}