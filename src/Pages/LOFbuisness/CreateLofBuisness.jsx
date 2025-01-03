import React from 'react'
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import LofBuisnessService from '@/Service/LofBuisnessService'
const formSchema = z.object({
    lofBuisness: z.string().min(1, {
        message: 'LOF Buisness is required.',
    }),
})

const CreateLofBuisness = ({ getLofBuisness, setIsOpen }) => {
   const form = useForm({
          resolver: zodResolver(formSchema),
          defaultValues: {
              lofBuisness: '',
          },
      })
  
      async function onSubmit(values) {
          try {
            console.groupEnd("values",values)
              const resp = await LofBuisnessService.createLofBuisness(values)
              
              if (resp.data.success) {
                  const searchParams = new URLSearchParams(location.search)
                  const page = searchParams.get('page')
                  if (page) {
                      navigate('/master-settings/lof-buisness')
                  } else {
                      getLofBuisness()
                  }
                  setIsOpen(false)
              }
          } catch (err) {}
      }
  return (
     <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add LOF Buisness</DialogTitle>
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="lofBuisness"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>LOF Buisness</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                                placeholder="LOF Buisness"
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

export default CreateLofBuisness
