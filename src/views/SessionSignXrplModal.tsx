import ModalStore from "@/store/ModalStore";
import {
  approveXrplRequest,
  rejectXrplRequest,
} from "@/utils/XRPLRequestHandler";
import { web3Wallet } from "@/utils/WalletConnectUtil";
import ProjectInfoCard from "@/components/ProjectInfoCard";
import RequestModalContainer from "@/components/RequestModalContainer";
import { Divider, Modal, Button, Text, Container } from "@nextui-org/react";
import { Fragment } from "react";

export default function SessionSignXrplModal() {
  // Get request and wallet data from store
  const requestEvent = ModalStore.state.data?.requestEvent;
  const requestSession = ModalStore.state.data?.requestSession;

  // Ensure request and wallet are defined
  if (!requestEvent || !requestSession) {
    return <span>Missing request data</span>;
  }

  // Get required request data
  const { topic } = requestEvent;

  // Handle approve action (logic varies based on request method)
  async function onApprove() {
    if (requestEvent) {
      try {
        const response = await approveXrplRequest(requestEvent);
        await web3Wallet.respondSessionRequest({
          topic,
          response,
        });
        ModalStore.close();
      } catch (e) {
        await onReject();
      }
    }
  }

  async function onReject() {
    if (requestEvent) {
      const response = rejectXrplRequest(requestEvent);
      await web3Wallet.respondSessionRequest({
        topic,
        response,
      });
      ModalStore.close();
    }
  }

  return (
    <Fragment>
      <RequestModalContainer title="Signature Request">
        <Container display="flex" justify="center">
          <Text h2>
            {requestEvent.params.request.params.tx_json.TransactionType}
          </Text>
        </Container>
        
        <Divider y={2} />
        <ProjectInfoCard metadata={requestSession.peer.metadata} />
      </RequestModalContainer>

      <Modal.Footer>
        <Button auto flat color="error" onClick={onReject}>
          Reject
        </Button>
        <Button auto flat color="success" onClick={onApprove}>
          Open
        </Button>
      </Modal.Footer>
    </Fragment>
  );
}
