import React from 'react'
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import ProcessService from '@/Service/ProcessService'

const CreateProcess = ({ getProcess, setIsOpen }) => {

    const formSchema = z.object({
        process: z.string().min(1, {
            message: 'Process is required.',
        }),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            process: '',
        },
    })

    async function onSubmit(values) {
        try {
            const resp = await ProcessService.createProcess(values)
            if (resp.data.success) {
                const searchParams = new URLSearchParams(location.search)
                const page = searchParams.get('page')
                if (page) {
                    navigate('/master-settings/process')
                } else {
                    getProcess()
                }
                setIsOpen(false)
            }
        } catch (err) {}
    }

    function onError(errors, e) {
        console.log(errors, e)
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Process</DialogTitle>
            </DialogHeader>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="process"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>Process</FormLabel>
                                    <FormControl>
                                        <Input className="shadow-none focus-visible:ring-transparent space-0 mt-0" placeholder="Process" {...field} />
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

export default CreateProcess
