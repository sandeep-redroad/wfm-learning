import React, { useRef, useState, useEffect } from 'react'
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
import { Dialog, DialogTrigger } from '@/Components/ui/dialog'
import CreatePointofContact from './CreatePointofContact'
import ClientAddressService from '@/Service/ClientAddressService'

const CreateClient = () => {
    const [isOpen, setIsOpen] = useState(false)
    const formRef = useRef(null)
    const [contact, setContact] = useState([])
    const formSchema = z.object({
        client: z.string().min(1, {
            message: 'Client is required',
        }),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        country: z.string().optional(),
        pinCode: z.string().optional(),
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
            pinCode: '',
        },
    })

    async function onSubmit(values) {
        console.log(values.client)

        try {
            const resp = await ClientService.createClient(values)
            if (resp.data.success) {
                console.log()
                contact.map((con, index) => {
                    let updatedObj = { ...con, client: values.client }
                    async function addpoc() {
                        try {
                            const cresp = await ClientAddressService.createClientAddress(updatedObj)
                            if (cresp.data.success) {
                                navigate('/clients')
                            }
                        } catch (err) {}
                    }
                    addpoc()
                    console.log('contact person', updatedObj)
                })
            }
        } catch (err) {}
    }

    function onError(errors, e) {
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
        <>
            <Card className="p-0 mx-0 rounded-none shadow-none mt-[63px] w-full">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-end items-center">
                        <div className="flex items-center justify-end gap-2">
                            <Link className="button" to="/clients">
                                <Button className="bg-transparent hover:bg-transparent text-black border border-gray-400">Back</Button>
                            </Link>
                            <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
                                <DialogTrigger>
                                    <Button className="bg-primary-purpal hover:bg-primary-purpal">Add POC</Button>
                                </DialogTrigger>
                                <CreatePointofContact setIsOpen={setIsOpen} contact={contact} setContact={setContact} />
                            </Dialog>
                            <Button className="bg-primary-purpal hover:bg-primary-purpal" onClick={handleSaveClick}>
                                Save
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="p-3" style={{ height: 'calc(100vh - 125px)' }}>
                <Card className="h-full overflow-card-scroll w-full m-0 overflow-auto">
                    <CardContent className="m-0 p-2 max-h-full">
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
                                                                let value = e.target.value ? Number(e.target.value) : ''
                                                                value = isNaN(value) ? '' : String(value)
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
        </>
    )
}

export default CreateClient
