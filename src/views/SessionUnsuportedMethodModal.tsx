import ProjectInfoCard from "@/components/ProjectInfoCard";
import RequestModalContainer from "@/components/RequestModalContainer";
import ModalStore from "@/store/ModalStore";
import { Button, Container, Divider, Modal, Text } from "@nextui-org/react";
import { Fragment } from "react";

export default function SessionUnsuportedMethodModal() {
  // Get request and wallet data from store
  const requestEvent = ModalStore.state.data?.requestEvent;
  const requestSession = ModalStore.state.data?.requestSession;

  // Ensure request and wallet are defined
  if (!requestEvent || !requestSession) {
    return <Text>Missing request data</Text>;
  }

  // Get required request data
  const { topic, params } = requestEvent;
  const { chainId, request } = params;

  return (
    <Fragment>
      <RequestModalContainer title="Unsuported Method">
        <Container display="flex" justify="center">
          <Text h2>{request.method}</Text>
        </Container>
        <ProjectInfoCard metadata={requestSession.peer.metadata} />

        <Divider y={2} />
        <ProjectInfoCard metadata={requestSession.peer.metadata} />
      </RequestModalContainer>

      <Modal.Footer>
        <Button auto flat color="error" onClick={ModalStore.close}>
          Close
        </Button>
      </Modal.Footer>
    </Fragment>
  );
}
