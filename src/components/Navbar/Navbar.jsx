import { useEffect } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  CloseButton,
  Text,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  SearchIcon,
} from '@chakra-ui/icons';
import HomeIcon from '@mui/icons-material/Home';
import EggAltIcon from '@mui/icons-material/EggAlt';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import IcecreamIcon from '@mui/icons-material/Icecream';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../../actions/logout';
import serverPath from '../../utils/serverPath';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user.user);
  const user = JSON.parse(localStorage.getItem('USER_DATA'));
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {}, [userState]);

  return (
    <Box borderRadius="md">
      <Box className="navbar" id="recipe_details_box">
        <IconButton
          size="lg"
          icon={<HamburgerIcon boxSize={6} />}
          aria-label="Open Menu"
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8}>
          <Link to="/">
            <Box>Logo</Box>
          </Link>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }} />
        </HStack>

        {/* AVATAR MENU */}
        <Menu>
          <MenuButton
            as={Button}
            rounded="full"
            variant="link"
            cursor="pointer"
            minW={0}
          >
            <Avatar
              size="sm"
              bg="teal.500"
              src={user ? serverPath + user.avatar : ''}
            />
          </MenuButton>
          <MenuList>
            {user && (
              <>
                <Link to="/profil">
                  <MenuItem>Profil</MenuItem>
                </Link>
                <MenuDivider />
              </>
            )}

            {!user ? (
              <Link to="/connexion">
                <MenuItem>Se connecter</MenuItem>
              </Link>
            ) : (
              <MenuItem
                onClick={() => {
                  dispatch(logoutRequest(navigate));
                }}
              >
                Se déconnecter
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <Flex justifyContent="space-between" alignItems="center">
            <DrawerHeader borderBottomWidth="1px">
              <Link to="/" onClick={onClose}>
                Logo
              </Link>
            </DrawerHeader>
            <CloseButton onClick={onClose} size="lg" mr={4} />
          </Flex>
          <DrawerBody>
            <Link to="/">
              <Box pb={8}>
                <Stack as="nav" spacing={4}>
                  <Box
                    onClick={onClose}
                    px={2}
                    py={1}
                    rounded="md"
                    _hover={{
                      textDecoration: 'none',
                      bg: 'gray.200',
                    }}
                  >
                    <Flex>
                      <HomeIcon style={{ color: '#b0bec5' }} />
                      <Text ml={2}>Accueil</Text>
                    </Flex>
                  </Box>
                </Stack>
              </Box>
            </Link>
            <Link to="/entrees">
              <Box pb={4}>
                <Stack as="nav" spacing={4}>
                  <Box
                    onClick={onClose}
                    px={2}
                    py={1}
                    rounded="md"
                    _hover={{
                      textDecoration: 'none',
                      bg: 'gray.200',
                    }}
                  >
                    <Flex>
                      <EggAltIcon style={{ color: '#b0bec5' }} />
                      <Text ml={2}>Entrées</Text>
                    </Flex>
                  </Box>
                </Stack>
              </Box>
            </Link>
            <Link to="/plats">
              <Box pb={4}>
                <Stack as="nav" spacing={4}>
                  <Box
                    onClick={onClose}
                    px={2}
                    py={1}
                    rounded="md"
                    _hover={{
                      textDecoration: 'none',
                      bg: 'gray.200',
                    }}
                  >
                    <Flex>
                      <DinnerDiningIcon style={{ color: '#b0bec5' }} />
                      <Text ml={2}>Plats</Text>
                    </Flex>
                  </Box>
                </Stack>
              </Box>
            </Link>
            <Link to="/desserts">
              <Box pb={4}>
                <Stack as="nav" spacing={4}>
                  <Box
                    onClick={onClose}
                    px={2}
                    py={1}
                    rounded="md"
                    _hover={{
                      textDecoration: 'none',
                      bg: 'gray.200',
                    }}
                  >
                    <Flex>
                      <IcecreamIcon style={{ color: '#b0bec5' }} />
                      <Text ml={2}>Desserts</Text>
                    </Flex>
                  </Box>
                </Stack>
              </Box>
            </Link>
            {user && (
              <>
                {' '}
                <Link to="/profil">
                  <Box pb={4}>
                    <Stack as="nav" spacing={4}>
                      <Box
                        onClick={onClose}
                        px={2}
                        py={1}
                        rounded="md"
                        _hover={{
                          textDecoration: 'none',
                          bg: 'gray.200',
                        }}
                      >
                        <Flex>
                          <LocalDiningIcon style={{ color: '#b0bec5' }} />
                          <Text ml={2}>Mes recettes</Text>
                        </Flex>
                      </Box>
                    </Stack>
                  </Box>
                </Link>
                <Link to="/profil">
                  <Box pb={4}>
                    <Stack as="nav" spacing={4}>
                      <Box
                        onClick={onClose}
                        px={2}
                        py={1}
                        rounded="md"
                        _hover={{
                          textDecoration: 'none',
                          bg: 'gray.200',
                        }}
                      >
                        <Flex>
                          <FavoriteIcon style={{ color: '#b0bec5' }} />
                          <Text ml={2}>Recettes enregistrées</Text>
                        </Flex>
                      </Box>
                    </Stack>
                  </Box>
                </Link>
              </>
            )}

            <Link to="/recherche">
              <Box mt={4}>
                <Stack as="nav" spacing={4}>
                  <Button
                    variant="solid"
                    colorScheme="telegram"
                    onClick={onClose}
                    size="sm"
                    mb={4}
                    leftIcon={<SearchIcon />}
                  >
                    Rechercher une recette
                  </Button>
                </Stack>
              </Box>
            </Link>
            {user && (
              <Link to="/creer-une-recette">
                <Box pb={4}>
                  <Stack as="nav" spacing={4}>
                    <Button
                      variant="solid"
                      colorScheme="teal"
                      onClick={onClose}
                      size="sm"
                      mb={4}
                      leftIcon={<AddIcon />}
                    >
                      Créer une recette
                    </Button>
                  </Stack>
                </Box>
              </Link>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Navbar;
