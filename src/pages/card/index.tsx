import { useParams } from "react-router-dom";
import { useAppDispatch } from '../../store/hooks';
import { addDeckList } from '../../store/modules/deckSlice';
import { Box, Flex, Text, Image, Spinner, Divider, Tag, Icon, Center, Button, Badge, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react"
import { CgImage, CgCheck, CgClose, CgShoppingCart, CgImport } from "react-icons/cg";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export const Card = () => {
  // state
  let selectedCard: any | null = null
  const { id } = useParams()
  const setId = id && id.split('-')[0]
  const source = localStorage.getItem('setCardList')
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white'
        }
      },
    },
    scales: {
      y: {
        ticks: { color: 'white', beginAtZero: true }
      },
      x: {
        ticks: { color: 'white', beginAtZero: true }
      }
    }
  };

  if (source) {
    selectedCard = JSON.parse(source)[`${setId}`].find((item: { id: string }) => item.id === id)
  }

  // methods
  const dispatch = useAppDispatch();

  // template
  const subtypes = (selectedCard.subtypes && selectedCard.subtypes.map((item: string, index: number) => (<Tag key={index} ml={2} colorScheme='green'>{item}</Tag>)))
  const chartDataMapping = (type: string, source: any) => {
    const data = {
      labels: [] as string[],
      datasets: [] as { label: string, data: number[], borderColor: string, backgroundColor: string }[]
    }

    if (type === 'tcgplayer') {
      const { normal, reverseHolofoil, holofoil } = source
      data.labels = ['最低價', '中間價', '最高價']
      if (normal) {
        data.datasets.push({
          label: '標準',
          data: [normal.low, normal.mid, normal.high],
          borderColor: '#38A169',
          backgroundColor: "#38A169",
        })
      }
      if (reverseHolofoil) {
        data.datasets.push({
          label: '反閃卡',
          data: [reverseHolofoil.low, reverseHolofoil.mid, reverseHolofoil.high],
          borderColor: '#3182CE',
          backgroundColor: "#3182CE",
        })
      }
      if (holofoil) {
        data.datasets.push({
          label: '閃卡',
          data: [holofoil.low, holofoil.mid, holofoil.high],
          borderColor: '#F6E05E',
          backgroundColor: '#F6E05E',
        })
      }
    } else {
      const { avg1, avg7, avg30, reverseHoloAvg1, reverseHoloAvg7, reverseHoloAvg30 } = source
      data.labels = ['1日均價', '7日均價', '30日均價']
      data.datasets.push({
        label: '標準',
        data: [avg1, avg7, avg30],
        borderColor: '#38A169',
        backgroundColor: '#38A169',
      })
      if (reverseHoloAvg1 && reverseHoloAvg7 && reverseHoloAvg30) {
        data.datasets.push({
          label: '閃卡／反閃卡',
          data: [reverseHoloAvg1, reverseHoloAvg7, reverseHoloAvg30],
          borderColor: '#3182CE',
          backgroundColor: '#3182CE',
        })
      }
    }

    return data
  }
  const tcgplayerMarketTable = (
    <TableContainer mt={4}>
      <Table size='sm' variant='simple'>
        <Thead>
          <Tr>
            <Th></Th>
            {selectedCard.tcgplayer.prices.normal && (<Th isNumeric>標準</Th>)}
            {selectedCard.tcgplayer.prices.holofoil && (<Th isNumeric>閃卡</Th>)}
            {selectedCard.tcgplayer.prices.reverseHolofoil && (<Th isNumeric>反閃卡</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>市場價</Td>
            {selectedCard.tcgplayer.prices.normal && (<Td isNumeric>$ {selectedCard.tcgplayer.prices.normal.market}</Td>)}
            {selectedCard.tcgplayer.prices.holofoil && (<Td isNumeric>$ {selectedCard.tcgplayer.prices.holofoil.market}</Td>)}
            {selectedCard.tcgplayer.prices.reverseHolofoil && (<Td isNumeric>$ {selectedCard.tcgplayer.prices.reverseHolofoil.market}</Td>)}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
  const cardmarketTable = (
    <TableContainer mt={4}>
      <Table size='sm' variant='simple'>
        <Thead>
          <Tr>
            <Th></Th>
            <Th isNumeric>標準</Th>
            {selectedCard.cardmarket.prices.reverseHoloTrend > 0 && (<Th isNumeric>閃卡／反閃卡</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>趨勢價</Td>
            <Td isNumeric>€ {selectedCard.cardmarket.prices.trendPrice}</Td>
            {selectedCard.cardmarket.prices.reverseHoloTrend > 0 && (<Td isNumeric>€ {selectedCard.cardmarket.prices.reverseHoloTrend}</Td>)}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )

  return selectedCard ? (
    <Flex align='start' wrap='wrap'>
      <Box maxW={[500, '25vw']} mr={[0, 10]} mb={[4, 4, 0]}>
        <Image fallback={<Box w={[300, '25vw']} h={300} display='flex' alignItems='center' justifyContent='center'><Spinner color='red.500' size='xl' /></Box>}
          src={selectedCard.images.large}
          alt={selectedCard.name}
        />
      </Box>
      <Box flex='1'>
        <Flex align='center' justifyContent='space-between' wrap='wrap'>
          <Box>
            <Text display='flex' alignItems='center' fontSize='4xl' fontWeight='bold'>{selectedCard.name}{subtypes}</Text>
            <Text fontSize='md' color='gray.500'>{selectedCard.flavorText}</Text>
            {selectedCard.artist && (<Text display='inline-flex' alignItems='center' fontSize='sm' color='yellow.500' fontWeight='bold'><Icon as={CgImage} mr={1} />繪師：{selectedCard.artist}</Text>)}
            <Box mt={2}>
              <Button rightIcon={<CgImport />} size='sm' colorScheme='purple' borderRadius='full' onClick={() => dispatch(addDeckList(selectedCard))}>放入牌組</Button>
            </Box>
          </Box>
          {selectedCard.legalities.standard && selectedCard.legalities.expanded &&
            (<Flex my={2} align='center' textAlign='center' color='white'>
              <Box mr={4} boxShadow='lg'>
                <Center bg='blue.900' borderTopRadius={6} p={2}>
                  <Text fontSize='sm' fontWeight='bold'>標準賽制</Text>
                </Center>
                <Center bg={selectedCard.legalities.standard === 'Legal' ? 'green.500' : 'red'} borderBottomRadius={6} px={2} py={1}>
                  <Icon as={selectedCard.legalities.standard === 'Legal' ? CgCheck : CgClose} boxSize='1.75em' />
                </Center>
              </Box>
              <Box boxShadow='lg'>
                <Center bg='blue.900' borderTopRadius={6} p={2}>
                  <Text fontSize='sm' fontWeight='bold'>開放賽制</Text>
                </Center>
                <Center bg={selectedCard.legalities.expanded === 'Legal' ? 'green.500' : 'red'} borderBottomRadius={6} px={2} py={1}>
                  <Icon as={selectedCard.legalities.expanded === 'Legal' ? CgCheck : CgClose} boxSize='1.75em' />
                </Center>
              </Box>
            </Flex>)
          }
        </Flex>
        <Divider my={4} />
        <Flex align='center' justifyContent='space-between' textAlign='center' wrap='wrap' color='white'>
          <Box w={['100%', '48%']}>
            <Flex mb={4} align='center' justify='space-between'>
              <Text fontSize='lg' fontWeight='bold'>TCGplayer<Badge ml={2} colorScheme='gray' variant='subtle'>美元計價</Badge></Text>
              <a href={selectedCard.tcgplayer.url} target="_blank" rel="noopener noreferrer">
                <Button colorScheme='blue' borderRadius='full' size='sm'><Icon as={CgShoppingCart} mr={1} />前往購買</Button>
              </a>
            </Flex>
            <Line options={chartOptions} data={chartDataMapping('tcgplayer', selectedCard.tcgplayer.prices)} />
            {tcgplayerMarketTable}
            <Text mt={4} fontSize='xs' textAlign='right'>資料更新日期：{selectedCard.tcgplayer.updatedAt}</Text>
          </Box>
          <Box w={['100%', '48%']}>
            <Flex mb={4} align='center' justify='space-between'>
              <Text fontSize='lg' fontWeight='bold'>Cardmarket<Badge ml={2} colorScheme='gray' variant='subtle'>歐元計價</Badge></Text>
              <a href={selectedCard.cardmarket.url} target="_blank" rel="noopener noreferrer">
                <Button colorScheme='blue' borderRadius='full' size='sm'><Icon as={CgShoppingCart} mr={1} />前往購買</Button>
              </a>
            </Flex>
            <Line options={chartOptions} data={chartDataMapping('cardmarket', selectedCard.cardmarket.prices)} />
            {cardmarketTable}
            <Text mt={4} fontSize='xs' textAlign='right'>資料更新日期：{selectedCard.cardmarket.updatedAt}</Text>
          </Box>
        </Flex>
      </Box >
    </Flex >
  ) : (
    <Flex mt='35vh' align='center' justifyContent='center'>
      <Spinner
        thickness='6px'
        color='red.500'
        size='xl'
      />
    </Flex>)
}
