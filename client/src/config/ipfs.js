import {create} from 'ipfs-http-client';

const ipfsClient = async () => {
  const ipfs = await create({
    host : "ipfs.infura.io",
    port : 5001,
    protocol : "https"
  })
  return ipfs;
}



export default ipfsClient;
