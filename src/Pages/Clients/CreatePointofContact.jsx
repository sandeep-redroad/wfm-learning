import React from 'react'
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import { Textarea } from '@/Components/ui/textarea'
import { toast } from 'react-toastify'

const formSchema = z.object({
    contactPerson: z.string().min(1, {
        message: 'Name is required.',
    }),
    designation: z.string().min(1, {
        message: 'Designation is required.',
    }),
    address: z.string().min(1, {
        message: 'address is required.',
    }),
})

const CreatePointofContact = ({ contact,setContact, setIsOpen }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            designation: '',
            address: '',
        },
    })

    async function onSubmit(values) {
        console.log('values', values,contact)
        setContact((prev)=>[...prev,values])
        console.log('values', values,contact)
        setIsOpen(false);
        form.reset();
        // try {
        //     const resp = await DepartmentService.createDepartment(values)
        //     if (resp.data.success) {
        //         const searchParams = new URLSearchParams(location.search)
        //         const page = searchParams.get('page')
        //         if (page) {
        //             navigate('/master-settings/department')
        //         } else {
        //             getDepartment()
        //         }
        //         setIsOpen(false)
        //     }
        // } catch (err) {}
    }

    async function onError(errors, e) {
        console.log('errors', errors, e)
        const errorKeys = Object.keys(errors)
        if (errorKeys.length > 0 && errors[errorKeys[0]]?.message) {
            toast.error(errors[errorKeys[0]].message)
        } else {
            toast.error('Something went wrong.')
        }
        // try {
        //     const resp = await DepartmentService.createDepartment(values)
        //     if (resp.data.success) {
        //         const searchParams = new URLSearchParams(location.search)
        //         const page = searchParams.get('page')
        //         if (page) {
        //             navigate('/master-settings/department')
        //         } else {
        //             getDepartment()
        //         }
        //         setIsOpen(false)
        //     }
        // } catch (err) {}
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add POC</DialogTitle>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="contactPerson"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input className="shadow-none focus-visible:ring-transparent space-0 mt-0" placeholder="Name" {...field} />
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
                                    <Input className="shadow-none focus-visible:ring-transparent space-0 mt-0" placeholder="Designation" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
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
                    <div className="flex justify-end">
                        <Button type="submit" className="bg-primary-purpal hover:bg-primary-purpal">
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </DialogContent>
    )
}

export default CreatePointofContact
