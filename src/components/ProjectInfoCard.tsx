import { Avatar, Col, Link, Row, Text } from '@nextui-org/react'
import { Web3WalletTypes } from '@walletconnect/web3wallet'

/**
 * Types
 */
interface IProps {
  metadata: Web3WalletTypes.Metadata
}

/**
 * Components
 */
export default function ProjectInfoCard({ metadata }: IProps) {
  const { icons, name, url } = metadata

  return (
    <Row align="center">
      <Col span={3}>
        <Avatar src={icons[0]} />
      </Col>
      <Col span={14}>
        <Text h5>{name}</Text>
        <Link href={url}>{url}</Link>
      </Col>
    </Row>
  )
}
