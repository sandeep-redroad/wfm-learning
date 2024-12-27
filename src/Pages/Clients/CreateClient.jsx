import React, { useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import { Link } from 'react-router-dom'
import { Textarea } from '@/Components/ui/textarea'
import { toast } from 'react-toastify'
import { capitalizeFirstChar } from '@/utils/helper'
import { Card, CardContent } from '@/components/ui/card'

const formSchema = z.object({
    name: z.string().min(1),
})

const CreateClient = () => {
    const formRef = useRef(null)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        },
    })

    function onSubmit(values) {
        console.log(values)
    }

    function onError(errors, e) {
        const errorKeys = Object.keys(errors)
        if (errorKeys.length > 0) {
            toast.error(capitalizeFirstChar(errorKeys[0]) + ' is required.')
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
            <Card className="p-0 mb-[75px] mx-0 rounded-none sticky top-16 w-full z-10">
                <CardContent className="m-0 flex justify-end items-center p-3">
                    <div className="flex justify-end items-center">
                        <div className="flex items-center justify-end gap-2">
                            <Link className="button" to="/daily-work-log">
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
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                                        placeholder="Name"
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
                                                    />
                                                </FormControl>
                                                <FormMessage />
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
                                                    <FormMessage />
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
                                                    <FormMessage />
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
                                                <FormMessage />
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
