import React, { useEffect, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Textarea } from '@/Components/ui/textarea'
import { toast } from 'react-toastify'
import { Card, CardContent } from '@/components/ui/card'
import BillingEntityService from '@/Service/BillingEntityService'

const EditBillingEntiy = () => {
    const { billingEntityId } = useParams()
    const formRef = useRef(null)
    const formSchema = z.object({
        contactPerson: z
            .string()
            .min(1, {
                message: 'Billing Entity is required',
            }),
        gstNumber: z
            .string()
            .min(1, {
                message: 'GST Number is required',
            }),
        designation: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        country: z.string().optional(),
        pinCode: z.string().optional()
    })
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            contactPerson: '',
            address: '',
            city: '',
            state: '',
            country: '',
            pinCode: '',
            gstNumber : ''
        },
    })

    const getBillingEntity = async () => {
        const resp = await BillingEntityService.getBillingEntity(billingEntityId)
        if (resp.data.success) {
            if (!resp.data.data) {
                toast.error('Billing Entity Not Found')
                navigate('/master-settings/billing-entity')
                return
            }
            form.reset({ ...resp.data.data })
        }
    }

    useEffect(() => {
        getBillingEntity()
    }, [billingEntityId])

    async function onSubmit(values) {
        try {
            // values['pinCode'] = values['pinCode'] == '' ? null : values['pinCode']
            const resp = await BillingEntityService.updateBillingEntity(billingEntityId, values)
            if (resp.data.success) {
                navigate('/master-settings/billing-entity')
            }
        } catch (err) {}
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
                            <Link className="button" to="/master-settings/billing-entity">
                                <Button className="bg-transparent hover:bg-transparent text-black border border-gray-400">Back</Button>
                            </Link>
                            <Button className="bg-primary-purpal hover:bg-primary-purpal" onClick={handleSaveClick}>
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
                                        name="contactPerson"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel>Billing Entity</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                                        placeholder="Billing entity"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="designation"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel>Designation</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                                        placeholder="Designation"
                                                        {...field}
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
                                    <FormField
                                        control={form.control}
                                        name="pinCode"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel>Pin Code</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                                        placeholder="Pin Code"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="gstNumber"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel>GST Number</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                                        placeholder="GST Number"
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

export default EditBillingEntiy
