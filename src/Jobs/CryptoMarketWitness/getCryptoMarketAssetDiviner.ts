import { XyoCryptoMarketAssetDiviner, XyoCryptoMarketAssetDivinerConfigSchema } from '@xyo-network/crypto-asset-payload-plugin'

import { getAccount } from '../../Account'

export const getCryptoMarketAssetDiviner = async (): Promise<XyoCryptoMarketAssetDiviner> => {
  return await XyoCryptoMarketAssetDiviner.create({
    account: getAccount(),
    config: {
      schema: XyoCryptoMarketAssetDivinerConfigSchema,
    },
  })
}
