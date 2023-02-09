import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Heading, MultiStep, Text, TextInput } from '@doro-ui/react'
import { Container, Form, FormError, Header } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'phosphor-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { NextSeo } from 'next-seo'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letrar ' })
    .regex(/^([a-z\\\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens ',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letra ' }),
})

type registerFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<registerFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  useEffect(() => {
    setValue('username', String(router.query?.username))
  }, [router.query?.username, setValue])

  async function handleRegister(data: registerFormData) {
    try {
      await api.post('/users', {
        username: data.username,
        name: data.name,
      })

      await router.push('/register/connect-calendar')
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data?.message) {
        alert(error.response.data.message)
      }
    }
  }

  return (
    <>
      <NextSeo title="Crie uma conta | Ignite Call" />

      <Container>
        <Header>
          <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>
          <MultiStep size={4} currentStep={1} />
        </Header>

        <Form onSubmit={handleSubmit(handleRegister)} as="form">
          <label>
            <Text size="sm">Nome de usuário</Text>
            <TextInput
              prefix="ignite.com/"
              placeholder="seu-usuário"
              {...register('username')}
            />
            {errors.username && (
              <FormError>{errors.username.message}</FormError>
            )}
          </label>
          <label>
            <Text size="sm">Nome Completo</Text>
            <TextInput placeholder="seu nome completo" {...register('name')} />
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </label>
          <Button disabled={isSubmitting} type="submit">
            Próximo passo <ArrowRight weight="bold" />
          </Button>
        </Form>
      </Container>
    </>
  )
}
