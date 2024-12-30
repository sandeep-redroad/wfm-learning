import React from 'react'
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import DepartmentService from '@/Service/DepartmentService'
const formSchema = z.object({
    department: z.string().min(1, {
        message: 'Department is required.',
    }),
})
const CreateDepartment = ({ getDepartment, setIsOpen }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            department: '',
        },
    })

    async function onSubmit(values) {
        try {
            const resp = await DepartmentService.createDepartment(values)
            if (resp.data.success) {
                const searchParams = new URLSearchParams(location.search)
                const page = searchParams.get('page')
                if (page) {
                    navigate('/master-settings/department')
                } else {
                    getDepartment()
                }
                setIsOpen(false)
            }
        } catch (err) {}
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Department</DialogTitle>
            </DialogHeader>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>Department</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                            placeholder="Department"
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

export default CreateDepartment
