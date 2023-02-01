import { Button, Heading, MultiStep, Text } from '@doro-ui/react'
import { Container, Header } from '../styles'
import { ArrowRight, Check } from 'phosphor-react'
// import { api } from '@/lib/axios'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Register() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'
  // export async function handleRegister() {}

  async function handleConnectCalendar() {
    await signIn('google', { callbackUrl: '/register/connect-calendar' })
  }

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
          {isSignedIn ? (
            <Button disabled>
              Conectado
              <Check weight="bold" />
            </Button>
          ) : (
            <Button variant="secondary" onClick={handleConnectCalendar}>
              Conectar
              <ArrowRight weight="bold" />
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </AuthError>
        )}

        <Button type="submit" disabled={!isSignedIn}>
          Próximo passo <ArrowRight weight="bold" />
        </Button>
      </ConnectBox>
    </Container>
  )
}
