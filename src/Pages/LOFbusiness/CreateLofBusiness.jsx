import React from 'react'
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import LofBusinessService from '@/Service/LofBusinessService'
const formSchema = z.object({
    lofBusiness: z.string().min(1, {
        message: 'LOF Business is required.',
    }),
})

const CreateLofBusiness = ({ getLofBusiness, setIsOpen }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lofBusiness: '',
        },
    })

    async function onSubmit(values) {
        try {
            const resp = await LofBusinessService.createLofBusiness(values)

            if (resp.data.success) {
                const searchParams = new URLSearchParams(location.search)
                const page = searchParams.get('page')
                if (page) {
                    navigate('/master-settings/lof-business')
                } else {
                    getLofBusiness()
                }
                setIsOpen(false)
            }
        } catch (err) {}
    }
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add LOF Business</DialogTitle>
            </DialogHeader>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="lofBusiness"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>LOF Business</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                            placeholder="LOF Business"
                                            {...field}
                                        />
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
            </div>
        </DialogContent>
    )
}

export default CreateLofBusiness
