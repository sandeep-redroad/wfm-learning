import React, { useEffect } from 'react'
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import BillingTypeService from '@/Service/BillingTypeService'
import { useNavigate } from 'react-router-dom'
const formSchema = z.object({
    billingType: z.string().min(1, {
        message: 'Billing type is required.',
    }),
})
const CreateBillingType = ({ getBillingTypes, setIsOpen }) => {
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            billingType: '',
        },
    })
    useEffect(() => {
        form.reset({
            billingType: '',
        })
    }, [form])
    
    async function onSubmit(values) {
        try {
            const resp = await BillingTypeService.createBillingType(values)
            if (resp.data.success) {
                const searchParams = new URLSearchParams(location.search)
                const page = searchParams.get('page')
                if (page) {
                    navigate('/master-settings/billing')
                } else {
                    getBillingTypes()
                }
                setIsOpen(false)
            }
        } catch (err) {}
    }

    return (
        <DialogContent aria-labelledby="dialog-title" aria-describedby="">
            <DialogHeader>
                <DialogTitle>Add Billing Type</DialogTitle>
            </DialogHeader>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="billingType"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>Billing Type</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                            placeholder="Billing type"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button type="submit" className="bg-primary-purpal hover:bg-primary-purpal ">
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </DialogContent>
    )
}

export default CreateBillingType
