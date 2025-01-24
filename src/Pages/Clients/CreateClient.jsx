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
import { getAbbrWord } from '@/utils/helper'

const CreateClient = () => {
    const [isOpen, setIsOpen] = useState(false)
    const formRef = useRef(null)
    const [contact, setContact] = useState([])
    const formSchema = z.object({
        client: z
            .string({
                message: 'Client is required',
            })
            .min(1, {
                message: 'Client is required',
            }),
        abbreviation: z
            .string({
                message: 'abbreviation is required',
            })
            .min(1, {
                message: 'abbreviation is required',
            }),
        address: z.string().optional(),
    })
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            client: '',
            abbreviation: '',
            address: '',
        },
    })

    async function addPointOfContact() {
        try {
            return await ClientAddressService.createClientAddress(updatedObj)
        } catch (err) {}
        return null
    }

    async function onSubmit(values) {
        console.log(values.client)

        try {
            const resp = await ClientService.createClient(values)
            if (resp.data.success) {
                contact.map((con, index) => {
                    let updatedObj = { ...con, client: values.client }
                    let pointOfContactResponse = addPointOfContact(updatedObj)
                    if(pointOfContactResponse !== null){
                        
                    }
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
                            <Link className="button" to="/client">
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
                                                            {...field}
                                                            className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                                            placeholder="client"
                                                            onChange={(e) => {
                                                                field.onChange(e.target.value)
                                                                // console.log("e.target.value : ", e.target.value , getAbbrWord(e.target.value))
                                                                form.setValue('abbreviation', getAbbrWord(e.target.value))
                                                            }}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="abbreviation"
                                            render={({ field }) => (
                                                <FormItem className="space-y-1">
                                                    <FormLabel>Abbreviation</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                                            placeholder="Abbreviation"
                                                            {...field}
                                                            value={field.value}
                                                            onChange={(e) => {
                                                                console.log('e.target.value : ', e.target.value)
                                                                if (e.target.value !== null) {
                                                                    field.onChange(e.target.value.toUpperCase())
                                                                }
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
