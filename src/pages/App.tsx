import { Box, Flex, Heading, Text, Button, Image, Spinner } from "@chakra-ui/react"
import { CgTrashEmpty } from "react-icons/cg";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { ScrollToTop } from "../components/ScrollToTop";

export const App = () => {
  const { pathname } = useLocation()
  const clearLocalStorage = () => {
    localStorage.removeItem('setCardList')
    localStorage.removeItem('setsList')
    localStorage.removeItem('chakra-ui-color-mode')
  }

  return (
    <>
      <Navbar />
      <Box w='100%' minH='calc(100vh - 74px - 66px)' p={6}>
        {pathname === '/Pokemon-TCG-Pokedex' ? (
          <Flex mt='12vh' align='center' justifyContent='center' direction='column'>
            <Box maxW={500}>
              <Image fallback={<Box w={[300, 500]} display='flex' alignItems='center' justifyContent='center'><Spinner color='red.500' size='xl' /></Box>} src='https://images.pokemontcg.io/bp/logo.png' />
            </Box>
            <Heading as='h1' size={['xl', '4xl']} mt={10}>歡迎來到寶可夢TCG圖鑑中心</Heading>
            <Heading as='h2' size={['sm', 'md']} mt={4} color='gray'>本系統會緩存資料於您的瀏覽器中，如須清除請手動點擊下面按鈕。</Heading>
            <Text mt={4} textAlign='center'>
              <Button leftIcon={<CgTrashEmpty />} colorScheme='green' borderRadius='99em' fontSize='sm' onClick={() => clearLocalStorage()}>清除緩存資料</Button>
            </Text>
          </Flex>
        ) : (
          <Outlet />
        )}
      </Box>
      <ScrollToTop />
      <Footer />
    </>
  )
}