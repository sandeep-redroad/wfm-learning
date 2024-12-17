import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { Eye, EyeClosed } from 'lucide-react'
import assets from '@/assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/Context/AuthContext'

const formSchema = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    password: z.string().min(2, {
        message: 'Password must be at least 2 characters.',
    }),
})

const Login1 = () => {
    const { login } = useAuth()
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })

    /**
     * This will call on submit form with no validation error
     *
     */
    function onSubmit(values) {
        setIsLoading(true)
        setIsError(false)
        console.log(values)
        login()
    }

    /**
     * This will call on validation failed
     *
     */
    const onError = (errors, e) => {
        setIsLoading(true)
        console.log('Error found ')
        setIsError(true)
        login()
        navigate('/')
    }

    return (
        <div className="flex bg-primary-ink h-screen justify-center items-center">
            <div className="absolute top-8 left-10">
                <img src={assets.redroadwhitelogo} alt="Logo" />
            </div>
            <div className="w-4/6 flex justify-center">
                <div class="text-white">
                    <h4 class="font-bold my-4 flex gap-3 text-2xl">
                        <span>More Growth.</span>
                        <span>More Precision.</span>
                        <span>More Credibility.</span>
                    </h4>
                    <h1 class="text-8xl my-4 font-extrabold"> Choose the</h1>
                    <h1 class="text-8xl my-4 font-extrabold"> power of more</h1>
                </div>
            </div>
            <div className="w-2/6 flex justify-start ">
                <Card className="w-96  px-2 py-8 ">
                    <CardContent className="pb-0">
                        <div className="text-center">
                            <h1 className=" text-2xl font-bold mb-4">
                                Login to REDROAD
                            </h1>
                        </div>
                        <Form {...form}>
                            <form className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    className=" focus-visible:ring-transparent space-0 mt-0"
                                                    placeholder="jane@example.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>Password</FormLabel>
                                            <div className="relative">
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        className=" focus-visible:ring-transparent space-0 mt-0"
                                                        placeholder="***************"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <div className=" absolute top-2 right-2">
                                                    {showPassword ? (
                                                        <EyeClosed
                                                            className="text-gray-400"
                                                            onClick={() =>
                                                                setShowPassword(
                                                                    !showPassword
                                                                )
                                                            }
                                                        />
                                                    ) : (
                                                        <Eye
                                                            className="text-gray-400"
                                                            onClick={() =>
                                                                setShowPassword(
                                                                    !showPassword
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                        <div className="mt-3 text-sm underline flex justify-end ">
                            <Link to="https://redconnect.v14livestaging.redroadhbs.org/#forgot">
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="flex justify-center mt-5 w-full">
                            <Button
                                className="w-full bg-primary-ink hover:bg-primary-ink"
                                onClick={form.handleSubmit(onSubmit, onError)}
                            >
                                {isError
                                    ? 'Invalid Login. Try again.'
                                    : isLoading
                                    ? 'Loading...'
                                    : 'Login'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Login1
