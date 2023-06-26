import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import {
  Center,
  Heading,
  KeyboardAvoidingView,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from "native-base";
import { useState } from "react";
import { Platform, TouchableOpacity } from "react-native";

// Components
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";

const PHOTO_SIZE = 33;

export function Profile() {
  // Hooks
  const toast = useToast();

  // Local states
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "http://github.com/sergiofilhoja.png"
  );

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) return;

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          toast.show({
            title: "Essa imagem é muito grande. Escolha uma até 3MB",
            placement: "bottom",
            bgColor: "red.500",
          });
          return;
        }
        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Center mt={6} px={10}>
            {photoIsLoading ? (
              <Skeleton
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded="full"
                startColor="gray.500"
                endColor="gray.400"
              />
            ) : (
              <UserPhoto
                source={{ uri: userPhoto }}
                alt="Foto do usuário"
                size={PHOTO_SIZE}
              />
            )}

            <TouchableOpacity onPress={handleUserPhotoSelect}>
              <Text
                color="green.500"
                fontFamily="heading"
                fontSize="md"
                mt={2}
                mb={8}
              >
                Alterar foto
              </Text>
            </TouchableOpacity>

            <Input placeholder="Nome" bg="gray.600" />
            <Input placeholder="E-mail" bg="gray.600" isDisabled />
          </Center>

          <VStack px={10} mt={12} mb={9} pb={16}>
            <Heading color="gray.200" fontSize="md" mb={2} fontFamily="heading">
              Alterar senha
            </Heading>

            <Input bg="gray.600" placeholder="Senha antiga" secureTextEntry />

            <Input bg="gray.600" placeholder="Nova senha" secureTextEntry />

            <Input
              bg="gray.600"
              placeholder="Confirme nova senha"
              secureTextEntry
            />

            <Button title="Atualizar" mt={4} />
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </VStack>
  );
}
