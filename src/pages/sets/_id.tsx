import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { cardList, setCardList, reset } from '../../store/modules/setsSlice';
import { addDeckList } from '../../store/modules/deckSlice';
import API from "../../api/index"
import { SimpleGrid, Image, Flex, Spinner, Button, Icon, Box, Tooltip } from "@chakra-ui/react"
import { CgImport } from "react-icons/cg";
import { Link, useParams } from "react-router-dom";

export const Set = () => {
  // state
  const list = useAppSelector(cardList);
  const { id } = useParams()
  const existData = localStorage.getItem('setCardList')

  // methods
  const dispatch = useAppDispatch();
  const getCardList = () => {
    dispatch(reset())

    if (existData) {
      const cacheData = JSON.parse(existData)[`${id}`]
      if (cacheData) {
        dispatch(setCardList(cacheData))
      } else {
        API.SERVE.CARDS.GET_All_CARDS({ q: `set.id:${id}` }).then((result: any) => {
          const { data } = result.data
          const originCacheData = JSON.parse(existData)
          Object.assign(originCacheData, {
            [`${id}`]: data
          })
          localStorage.setItem('setCardList', JSON.stringify(originCacheData))
          dispatch(setCardList(data))
        })
      }
    } else {
      API.SERVE.CARDS.GET_All_CARDS({ q: `set.id:${id}` }).then((result: any) => {
        const { data } = result.data
        const cacheData: {} = {
          [`${id}`]: data
        }
        localStorage.setItem('setCardList', JSON.stringify(cacheData))
        dispatch(setCardList(data))
      })
    }
  }

  // hooks
  useEffect(() => {
    getCardList()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // template
  const setsListItems = (list.map((item: {
    id: string, name: string, images: { large: string, small: string }, number: string
  }) =>
  (<Box key={item.id} position='relative'>
    <Box bg='blackAlpha.700' borderRadius='full' boxShadow='xl' position='absolute' bottom='10px' right='10px'>
      <Tooltip hasArrow label='放入牌組' bg='blue.500' color='white'>
        <Button p={1} borderRadius='full' variant='ghost' colorScheme='blackAlpha' onClick={() => dispatch(addDeckList(item))}>
          <Icon as={CgImport} color='white' boxSize='1.25em' />
        </Button>
      </Tooltip>
    </Box>
    <Link to={`/Pokemon-TCG-Pokedex/card/${item.id}`}>
      <Image
        fallback={<Box w={200} h={300} display='flex' alignItems='center' justifyContent='center'><Spinner color='red.500' size='lg' /></Box>}
        objectFit='contain'
        src={item.images.small}
        mx='auto'
      />
    </Link>
  </Box >)
  ))

  return list.length > 0 ? (
    <SimpleGrid minChildWidth='200px' spacing='24px'>
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