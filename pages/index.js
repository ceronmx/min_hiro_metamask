import {Button, Stack, Flex} from '@chakra-ui/react'
import HiroLoginBtn from '../components/HiroLogin'
import MetamaskLoginBtn from '../components/MetamaskLogin'
import Head from 'next/head'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Guide</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <Flex justifyContent='center' pt='10px'>
        <Stack w='300px' flexDir='column'>
          <MetamaskLoginBtn />
          <HiroLoginBtn />
          <Button>Magic Link</Button>
        </Stack>
      </Flex>
    </div>
  )
}
