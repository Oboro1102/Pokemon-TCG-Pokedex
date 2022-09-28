import { Box, Flex, Text, Image, Spinner, Divider, Tag, Icon, Center, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react"
import { CgImage, CgCheck, CgClose, CgShoppingCart } from "react-icons/cg";

export const Deck = () => {
  // state
  const source = localStorage.getItem('setCardList')

  // template


  return (
    <Flex mt='35vh' align='center' justifyContent='center'>
      <Spinner
        thickness='6px'
        color='red.500'
        size='xl'
      />
    </Flex>
  )
}
