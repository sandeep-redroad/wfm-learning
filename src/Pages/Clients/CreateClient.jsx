import React, { useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Textarea } from '@/Components/ui/textarea'
import { toast } from 'react-toastify'
import { Card, CardContent } from '@/components/ui/card'
import ClientService from '@/Service/ClientService'

const CreateClient = () => {
    const formRef = useRef(null)
    const formSchema = z.object({
        client: z.string().min(1, {
            message: 'Client is required',
        }),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        country: z.string().optional(),
        pinCode: z
            .number({
                message: 'Pin Code should be number',
            })
            .optional(),
    })
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            client: '',
            address: '',
            city: '',
            state: '',
            country: '',
            pinCode: null,
        },
    })

    async function onSubmit(values) {
        try{
            const resp = await ClientService.createClient(values)
            if (resp.data.success) {
                navigate('/clients')
            }
        }catch(err){}
    }

    function onError(errors, e) {
        console.log(errors, e)
        const errorKeys = Object.keys(errors)
        if (errorKeys.length > 0 && errors[errorKeys[0]]?.message) {
            toast.error(errors[errorKeys[0]].message)
        } else {
            toast.error('Something went wrong.')
        }
    }

    const handleSaveClick = () => {
        if (formRef.current) {
            formRef.current.requestSubmit()
        }
    }
    return (
        <div>
            <Card className="p-0 mb-[72px] mx-0 rounded-none sticky top-16 w-full z-10">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-end items-center">
                        <div className="flex items-center justify-end gap-2">
                            <Link className="button" to="/clients">
                                <Button className="bg-transparent hover:bg-transparent text-black border border-gray-400">Back</Button>
                            </Link>
                            <Button className="" onClick={handleSaveClick}>
                                Save
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="p-0 m-3 mt-[3rem]">
                <CardContent className="m-0 p-3">
                    <Form {...form}>
                        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit, onError)} className="p-4 lg:ps-5">
                            <div className="grid gap-x-[3rem] gap-y-[1.75rem]">
                                <div className="grid grid-cols-2 gap-x-[3rem] gap-y-[1.75rem]">
                                    <FormField
                                        control={form.control}
                                        name="client"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel>Client</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                                        placeholder="client"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="pinCode"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel>Pin Code</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                                        placeholder="Pin Code"
                                                        {...field}
                                                        value={field.value || ''}
                                                        onChange={(e) => {
                                                            const value = e.target.value ? Number(e.target.value) : ''
                                                            field.onChange(value)
                                                        }}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-x-[3rem] gap-y-[1.75rem] my-[1.75rem">
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                                        placeholder="Address"
                                                        {...field}
                                                        rows="6"
                                                    ></Textarea>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid gap-x-[3rem] gap-y-[1.75rem]">
                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem className="space-y-1">
                                                    <FormLabel>City</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                                            placeholder="City"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="state"
                                            render={({ field }) => (
                                                <FormItem className="space-y-1">
                                                    <FormLabel>State</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                                            placeholder="State"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-[3rem] gap-y-[1.75rem]">
                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel>Country</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                                        placeholder="Country"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateClient
