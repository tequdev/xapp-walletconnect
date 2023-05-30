import { web3Wallet } from "@/utils/WalletConnectUtil";
import { getSdkError } from "@walletconnect/utils";
import { Button, Container, Grid, Spacer, Text, User } from "@nextui-org/react";
import { useMemo, useRef, useState } from "react";
import { xumm } from "@/store/XummStore";
import DisconnectIcon from "@/components/Icons/Disconnect";

function WalletConnect() {
  const [activeSessions, setActiveSessions] = useState(
    web3Wallet.getActiveSessions()
  );
  const uriRef = useRef<HTMLInputElement>(null);

  const onConnect = async () => {
    let uri: string;
    if (!uriRef.current?.value) {
      console.log(xumm.xapp?.scanQr);
      await xumm.xapp?.scanQr();
      uri = await new Promise<string>((resolve) => {
        xumm.xapp?.on("qr", (data) => {
          const uri = (data as any).qrContents.toString();
          resolve(uri);
        });
      });
    } else {
      uri = uriRef.current.value;
    }
    await web3Wallet.pair({ uri });
  };

  setInterval(() => setActiveSessions(web3Wallet.getActiveSessions()), 100);

  const onDisconnect = async (topic: string) => {
    await web3Wallet.disconnectSession({
      topic,
      reason: getSdkError("USER_DISCONNECTED"),
    });
    setActiveSessions(web3Wallet.getActiveSessions());
  };

  const sessions = useMemo(() => {
    const sessionKeys = Object.keys(activeSessions);
    return sessionKeys.map((key) => {
      return activeSessions[key];
    });
  }, [activeSessions]);

  return (
    <>
      <Container display="flex" justify="center">
        <Button onClick={onConnect}>QR Scan</Button>
      </Container>
      <Spacer y={2} />
      <Text>Active Sessions</Text>
      <Spacer y={1} />
      {sessions.map((session) => (
        <Grid.Container fluid display="flex" justify="center">
          <User
            src={session.peer.metadata.icons[0]}
            name={session.peer.metadata.name}
            description={session.peer.metadata.description}
          />
          <Button
            auto
            light
            color="error"
            icon={<DisconnectIcon fill="currentColor" filled />}
            onClick={() => onDisconnect(session.topic)}
          />
        </Grid.Container>
      ))}
      {/* <Input ref={uriRef} />
      <Button onClick={onConnect}>Connect</Button> */}
    </>
  );
}

export default WalletConnect;
