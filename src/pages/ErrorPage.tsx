import { Box, Text, Button } from '@chakra-ui/react'
import { Link } from "react-router-dom";

export const ErrorPage = () => {
    return (
        <Box w='100%' h='100vh' display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
            <Text textAlign={'center'} mb={10} fontSize='3xl' fontWeight='black'>您欲前往的頁面不存在，請檢查網址是否正確。</Text>
            <Link to="/Pokemon-TCG-Pokedex">
                <Button colorScheme='yellow' borderRadius='full' fontSize='sm' color='black'>回首頁</Button>
            </Link>
        </Box>
    );
}