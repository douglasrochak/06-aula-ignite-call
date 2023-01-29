import { Button, Heading, MultiStep, Text } from '@doro-ui/react'
import { Container, Header } from '../styles'
import { ArrowRight } from 'phosphor-react'
// import { api } from '@/lib/axios'
import { ConnectBox, ConnectItem } from './styles'

export default function Register() {
  // export async function handleRegister() {}

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button variant="secondary">
            Conectar
            <ArrowRight weight="bold" />
          </Button>
        </ConnectItem>

        <Button type="submit">
          Próximo passo <ArrowRight weight="bold" />
        </Button>
      </ConnectBox>
    </Container>
  )
}
