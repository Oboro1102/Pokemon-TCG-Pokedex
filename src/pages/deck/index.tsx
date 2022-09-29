import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setsList, setSetsList, setsListType } from '../../store/modules/setsSlice';
import { deckList, resetDeckList, removeDeckCard, tuneCardQuantity, deckListType } from '../../store/modules/deckSlice';
import { Link } from "react-router-dom";
import { Box, Flex, Text, Image, Spinner, Divider, Icon, Button, Badge, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react"
import { CgTrash, CgMathPlus, CgMathMinus, CgFileAdd } from "react-icons/cg";
import ExcelJs from "exceljs";

export const Deck = () => {
  // state
  const sets = useAppSelector(setsList);
  const deck = useAppSelector(deckList);

  // methods
  const dispatch = useAppDispatch();
  const initialSetsList = () => {
    if (sets.length < 1) {
      const setsSource = localStorage.getItem('setsList')
      if (setsSource) {
        dispatch(setSetsList(JSON.parse(setsSource)))
      }
    }
  }
  const getSetIcon = (setId: string) => {
    const target = sets.find((item: setsListType) => item.id === setId)
    if (target) {
      return target.images.logo
    }
  }
  const emptyDeck = () => {
    dispatch(resetDeckList())
    localStorage.removeItem('deckList')
  }
  const exportExcel = () => {
    const workbook = new ExcelJs.Workbook();
    const sheet = workbook.addWorksheet('我的牌組');
    const rows = deck.map(item => [item.id, item.number, item.name, item.quantity])

    sheet.addTable({
      name: '我的牌組',
      ref: 'A1',
      columns: [{ name: '卡片ID' }, { name: '卡片編號' }, { name: '名稱' }, { name: '數量' }],
      rows
    });

    workbook.xlsx.writeBuffer().then((content) => {
      const link = document.createElement("a");
      const blobData = new Blob([content], {
        type: "application/vnd.ms-excel;charset=utf-8;"
      });
      link.download = '我的牌組.xlsx';
      link.href = URL.createObjectURL(blobData);
      link.click();
    });
  }

  // hooks
  useEffect(() => {
    initialSetsList()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // template
  const deckCards = (deck.map((item: deckListType) => (
    <Tr key={item.id}>
      <Td>
        <Link to={`/Pokemon-TCG-Pokedex/card/${item.id}`} style={{ display: 'block', width: '100px', height: '100%' }}>
          <Image
            display='inline-block'
            fallback={<Box w={100} h={100} display='flex' alignItems='center' justifyContent='center'><Spinner color='red.500' size='lg' /></Box>}
            boxSize='100px'
            objectFit='contain'
            src={item.images}
          />
        </Link>
      </Td>
      <Td>{item.name}</Td>
      <Td>
        <Link to={`/Pokemon-TCG-Pokedex/set/${item.id.split('-')[0]}`} style={{ display: 'block', width: '75px', height: '100%' }}>
          <Image
            display='inline-block'
            fallback={<Box w={100} h={100} display='flex' alignItems='center' justifyContent='center'><Spinner color='red.500' size='lg' /></Box>}
            boxSize='75px'
            objectFit='contain'
            src={getSetIcon(item.id.split('-')[0])}
          />
        </Link>
      </Td>
      <Td>{item.number}</Td>
      <Td>
        <Flex align='center'>
          <Button p={1} isDisabled={item.quantity < 2} size='xs' colorScheme='red' borderRadius='full' onClick={() => dispatch(tuneCardQuantity({ type: 'minus', id: item.id }))}>
            <Icon as={CgMathMinus} />
          </Button>
          <Text mx={4}>{item.quantity}</Text>
          <Button p={1} size='xs' colorScheme='green' borderRadius='full' onClick={() => dispatch(tuneCardQuantity({ type: 'plus', id: item.id }))}>
            <Icon as={CgMathPlus} />
          </Button>
        </Flex>
      </Td>
      <Td>
        <Button size='sm' colorScheme='red' leftIcon={<CgTrash />} onClick={() => dispatch(removeDeckCard(item.id))}>刪除</Button>
      </Td>
    </Tr>
  ))
  )

  return deck.length > 0 ? (
    <Box>
      <Box textAlign='right'>
        <Button size='sm' colorScheme='green' leftIcon={<CgFileAdd />} onClick={() => exportExcel()}>匯出牌組</Button>
        <Button ml={4} size='sm' colorScheme='red' leftIcon={<CgTrash />} onClick={() => emptyDeck()}>清空牌組</Button>
      </Box>
      <Divider mt={6} />
      <TableContainer>
        <Table size='lg' variant='simple'>
          <Thead>
            <Tr>
              <Th>
                <Flex align='center'>
                  卡面<Badge ml={2} colorScheme='gray'>點擊圖片可快速轉跳連結</Badge>
                </Flex>
              </Th>
              <Th>名稱</Th>
              <Th>
                <Flex align='center'>
                  系列<Badge ml={2} colorScheme='gray'>點擊圖片可快速轉跳連結</Badge>
                </Flex>
              </Th>
              <Th>編號</Th>
              <Th>數量</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {deckCards}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  ) : (
    <Box w='100%' minH='calc(100vh - 74px - 66px - 24px*2)' display='flex' alignItems='center' justifyContent='center'>
      <Text textAlign={'center'} mb={10} fontSize='3xl' fontWeight='black'>您的牌組目前沒有卡片</Text >
    </Box >
  )
}
