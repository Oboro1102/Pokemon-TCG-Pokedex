import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setsList, setSetsList, reset } from '../../store/modules/setsSlice';
import API from "../../api/index"
import { Box, SimpleGrid, Flex, Text, Image, Spinner, Center, Icon } from "@chakra-ui/react"
import { CgCheck, CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";

export const Sets = () => {
  // state
  const list = useAppSelector(setsList);
  const existData = localStorage.getItem('setsList')

  // methods
  const dispatch = useAppDispatch();
  const getSetsList = () => {
    dispatch(reset())

    if (existData) {
      dispatch(setSetsList(JSON.parse(existData)))
    } else {
      API.SERVE.SETS.GET_ALL_SETS().then((result: any) => {
        const { data } = result.data
        localStorage.setItem('setsList', JSON.stringify(data))
        dispatch(setSetsList(data))
      })
    }
  }

  // hooks
  useEffect(() => {
    getSetsList()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // template
  const setsListItems = (list.map((item: {
    id: string, name: string, images: { logo: string, symbol: string }, releaseDate: string, ptcgoCode: string, total: number, legalities: { standard: string | null, expanded: string | null }
  }) =>
  (<Link to={`/Pokemon-TCG-Pokedex/set/${item.id}`} key={item.id} style={{ display: 'block', height: '100%' }}>
    <Box h='100%' bg='gray.900' p={6} borderRadius='16px' textAlign='center' >
      <Image
        fallback={<Box w={175} h={175} display='flex' alignItems='center' justifyContent='center'><Spinner color='red.500' size='lg' /></Box>}
        boxSize='175px'
        objectFit='contain'
        src={item.images.logo}
        mx='auto'
      />
      <Text fontWeight='bold'>{item.name}</Text>
      <Flex mt={4} align='center'>
        <Image
          fallback={<Box w={30} h={30} display='flex' alignItems='center' justifyContent='center'><Spinner color='red.500' size='lg' /></Box>}
          boxSize='30px'
          objectFit='contain'
          src={item.images.symbol}
          mr={4}
        />
        <Box textAlign='left'>
          <Text color='gray.500' fontSize='sm'>發售日：{item.releaseDate}</Text>
          <Text color='gray.500' fontSize='sm'>總張數：{item.total}</Text>
        </Box>
      </Flex>
      {item.legalities.standard && item.legalities.expanded &&
        (<Flex mt={4} align='center' justify='space-around' color='white'>
          <Flex boxShadow='lg'>
            <Text fontSize='xs' fontWeight='bold' bg='blue.900' borderLeftRadius={6} px={2} py={1}>標準賽制</Text>
            <Center bg={item.legalities.standard === 'Legal' ? 'green.500' : 'red'} borderRightRadius={6} px={1}>
              <Icon as={item.legalities.standard === 'Legal' ? CgCheck : CgClose} boxSize='1.25em' />
            </Center>
          </Flex>
          <Flex boxShadow='lg'>
            <Text fontSize='xs' fontWeight='bold' bg='blue.900' borderLeftRadius={6} px={2} py={1}>開放賽制</Text>
            <Center bg={item.legalities.expanded === 'Legal' ? 'green.500' : 'red'} borderRightRadius={6} px={1}>
              <Icon as={item.legalities.expanded === 'Legal' ? CgCheck : CgClose} boxSize='1.25em' />
            </Center>
          </Flex>
        </Flex>)
      }
    </Box>
  </Link >)
  ))

  return list.length > 0 ? (
    <SimpleGrid minChildWidth='250px' spacing='24px'>
      {setsListItems}
    </SimpleGrid >
  ) : (
    <Flex mt='35vh' align='center' justifyContent='center'>
      <Spinner
        thickness='6px'
        speed='0.65s'
        color='red.500'
        size='xl'
      />
    </Flex>)
}
