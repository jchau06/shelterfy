"use client";

import { Button, Input, Stack, Flex, Text, Center } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useForm } from "react-hook-form";

interface FormValues {
  shelterAddress: string;
  zipCode: number;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <Flex justify="right" width="100vw" height="100%" p="10">
        <Stack
          gap="3"
          backgroundColor="blackAlpha.200"
          p="6"
          borderRadius="lg"
          width="30vw"
        >
            <Center>
                <Text textAlign={"center"}>
                        Search for Nearby Shelters
                </Text>
            </Center>
            <Center>
                <Field
                    // label="Search for Shelters Near"
                    invalid={!!errors.shelterAddress}
                    errorText={errors.shelterAddress?.message}
                    textAlign={"center"}
                >
                    <Input
                    {...register("shelterAddress", { // Future Change: Only require one input, not all inputs
                        required: "Address is required.",
                    })}
                    placeholder="Enter an address."
                    backgroundColor="gray.50"
                    p="2"
                    />
                </Field>
            </Center>
        
            <Center>
                <Text
                textAlign={"center"}>
                    or
                </Text>
            </Center>

            <Center>
                <Field
                    invalid={!!errors.zipCode}
                    errorText={errors.zipCode?.message}
                    textAlign={"center"}
                >
                    <Input
                    {...register("zipCode", {
                        required: "Zip Code is required.",
                    })}
                    placeholder="Enter a zip code."
                    backgroundColor="gray.50"
                    p="2"
                    />
                </Field>
            </Center>

          <Button size="sm" type="submit" backgroundColor="gray.50">
            Submit
          </Button>
        </Stack>
      </Flex>
    </form>
  );
}
