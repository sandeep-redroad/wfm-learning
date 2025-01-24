import BodyCard from '@/Components/BodyCard'
import HeaderCard from '@/Components/HeaderCard'
import { Button } from '@/Components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/Components/ui/form'
import { Input } from '@/Components/ui/input'
import { Textarea } from '@/Components/ui/textarea'
import CompanyMasterService from '@/Service/CompanyMasterService'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

const CreateAndUpdateCompanyMaster = () => {
    const formRef = useRef(null)
    const formSchema = z.object({
        companyName: z
            .string({
                message: 'Company name is required',
            })
            .min(1, {
                message: 'Company name is required',
            }),
        pinCode: z
            .string({
                message: 'Pin Code is required',
            })
            .min(1, {
                message: 'Pin Code is required',
            }),
        address1: z
            .string({
                message: 'Address Line 1 is required',
            })
            .min(1, {
                message: 'Address Line 1 is required',
            }),
        address2: z
            .string({
                message: 'Address Line 2 is required',
            })
            .min(1, {
                message: 'Address Line 2 is required',
            }),
        city: z
            .string({
                message: 'City is required',
            })
            .min(1, {
                message: 'City is required',
            }),
        state: z
            .string({
                message: 'State is required',
            })
            .min(1, {
                message: 'State is required',
            }),
        country: z
            .string({
                message: 'Country is required',
            })
            .min(1, {
                message: 'Country is required',
            }),
        gstNumber: z
            .string({
                message: 'GST Number is required',
            })
            .min(1, {
                message: 'GST Number is required',
            }),
    })
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: '',
            pinCode: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            country: '',
            gstNumber: '',
        },
    })

    async function onSubmit(values) {
        try {
            console.log('values : ', values)
            const resp = await CompanyMasterService.createCompanyMaster(values)
            if (resp.data.success) {
                navigate('/master-settings/company')
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
            <HeaderCard>
                <div className="flex justify-end items-center w-full">
                    <div className="flex items-center justify-end gap-2 w-full">
                        <Link className="button" to="/invoice">
                            <Button className="bg-transparent hover:bg-transparent text-black border border-gray-400">Back</Button>
                        </Link>
                        <Button className="bg-primary-purpal hover:bg-primary-purpal" onClick={() => handleSaveClick()}>
                            Save
                        </Button>
                    </div>
                </div>
            </HeaderCard>
            <BodyCard>
                <Form {...form}>
                    <form ref={formRef} onSubmit={form.handleSubmit(onSubmit, onError)} className="p-4 lg:ps-5">
                        <div className="grid gap-x-[3rem] gap-y-[1.75rem]">
                            <div className="grid grid-cols-2 gap-x-[3rem] gap-y-[1.75rem]">
                                <FormField
                                    control={form.control}
                                    name="companyName"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>Company Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                                    placeholder="Company Name"
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
                                <FormField
                                    control={form.control}
                                    name="address1"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>Address Line 1</FormLabel>
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
                                    name="address2"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>Address Line 2</FormLabel>
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
                                    name="gstNumber"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>GST Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                                    placeholder="GST Number"
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
            </BodyCard>
        </>
    )
}

export default CreateAndUpdateCompanyMaster
