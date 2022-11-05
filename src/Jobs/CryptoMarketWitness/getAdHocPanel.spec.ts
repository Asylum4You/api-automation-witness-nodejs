import { XyoPayloadBuilder } from '@xyo-network/payload'

import { getAggregatePricePanel } from './getAdHocPanel'

describe('getAggregatePricePanel', () => {
  it('gets an getAggregatePricePanel', async () => {
    const payload = new XyoPayloadBuilder({ schema: 'network.xyo.test' }).build()
    expect(await getAggregatePricePanel(payload)).toBeObject()
  })
})
