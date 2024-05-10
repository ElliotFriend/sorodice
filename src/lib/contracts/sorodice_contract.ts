import * as Client from 'sorodice_contract';
import { rpcUrl } from '$lib/contracts/util';

export default new Client.Client({
  ...Client.networks.testnet,
  rpcUrl,
});
