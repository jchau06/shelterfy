"use client";

import { Button, Input, Stack, Flex, Text, Center } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useForm } from "react-hook-form";

interface FormValues {
  cityName: string;
  zipCode: number;
  milesVal: number;
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
                    invalid={!!errors.cityName}
                    errorText={errors.cityName?.message}
                    textAlign={"center"}
                >
                    <Input
                    {...register("cityName", { // Future Change: Only require one input, not all inputs
                        required: "City is required.",
                    })}
                    placeholder="Enter a city."
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
            
            <Center>
                <Text
                textAlign={"center"}>
                    or
                </Text>
            </Center>

            <Center>
                <Field
                    invalid={!!errors.milesVal}
                    errorText={errors.milesVal?.message}
                    textAlign={"center"}
                >
                    <Input
                    {...register("milesVal", {
                        required: "Miles is required.",
                    })}
                    placeholder="Enter a mile radius."
                    backgroundColor="gray.50"
                    p="2"
                    />
                </Field>
            </Center>

            <Center>
                <Button size="xs" type="submit" backgroundColor="gray.50" width="15vw">
                    Search
                </Button>
            </Center>
        </Stack>
      </Flex>
    </form>
  );
}
