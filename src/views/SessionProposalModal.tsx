import ProjectInfoCard from "@/components/ProjectInfoCard";
import ProposalSelectSection from "@/components/ProposalSelectSection";
import RequestModalContainer from "@/components/RequestModalContainer";
import SessionProposalChainCard from "@/components/SessionProposalChainCard";
import ModalStore from "@/store/ModalStore";
import { xrplAddresses } from "@/utils/XRPLWalletUtil";
import { isXrplChain } from "@/utils/HelperUtil";
import { web3Wallet } from "@/utils/WalletConnectUtil";
import { Button, Divider, Modal, Spacer, Text } from "@nextui-org/react";
import { SessionTypes } from "@walletconnect/types";
import { getSdkError } from "@walletconnect/utils";
import { Fragment, useState } from "react";

export default function SessionProposalModal() {
  const [selectedAccounts, setSelectedAccounts] = useState<
    Record<string, string[]>
  >({});

  // Get proposal data and wallet address from store
  const proposal = ModalStore.state.data?.proposal;

  // Ensure proposal is defined
  if (!proposal) {
    return <Text>Missing proposal data</Text>;
  }

  // Get required proposal data
  const { id, params } = proposal;
  const { proposer, requiredNamespaces, relays } = params;

  // Hanlde approve action, construct session namespace
  async function onApprove() {
    if (proposal) {
      const namespaces: SessionTypes.Namespaces = {};
      Object.keys(requiredNamespaces).forEach((key) => {
        const chains = requiredNamespaces[key].chains || [];
        namespaces[key] = {
          accounts: chains?.flatMap((chain)=> xrplAddresses.map((address) => `${chain}:${address}`)),
          chains: key.includes(":") ? [key] : requiredNamespaces[key].chains,
          methods: requiredNamespaces[key].methods,
          events: requiredNamespaces[key].events,
        };
      });
      await web3Wallet.approveSession({
        id,
        relayProtocol: relays[0].protocol,
        namespaces,
      })
    }
    ModalStore.close();
  }

  // Hanlde reject action
  async function onReject() {
    if (proposal) {
      await web3Wallet.rejectSession({
        id,
        reason: getSdkError("USER_REJECTED_METHODS"),
      });
    }
    ModalStore.close();
  }

  return (
    <Fragment>
      <RequestModalContainer title="Connect to this site?">
        <ProjectInfoCard metadata={proposer.metadata} />
      </RequestModalContainer>

      <Modal.Footer>
        <Button auto flat color="error" onClick={onReject}>
          Cancel
        </Button>
        <Spacer />
        <Button flat color="success" onClick={onApprove}>
          Connect
        </Button>
      </Modal.Footer>
    </Fragment>
  );
}
