import { useState } from 'react';
import { Box, Button, Input, Text, VStack, IconButton, useColorMode, useColorModeValue, Flex } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit, FaSun, FaMoon } from 'react-icons/fa';

const Note = ({ note, onDelete, onEdit }) => {
  return (
    <Flex bg={useColorModeValue('gray.100', 'gray.700')} p={4} w="full" alignItems="center" justifyContent="space-between">
      <Text>{note.text}</Text>
      <Box>
        <IconButton icon={<FaEdit />} onClick={() => onEdit(note)} m={1} aria-label="Edit note" />
        <IconButton icon={<FaTrash />} onClick={() => onDelete(note.id)} m={1} aria-label="Delete note" />
      </Box>
    </Flex>
  );
};

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const { toggleColorMode } = useColorMode();

  const addNote = () => {
    if (input) {
      const newNote = { id: Date.now(), text: input };
      setNotes([...notes, newNote]);
      setInput('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const editNote = (updatedNote) => {
    const updatedNotes = notes.map(note => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  return (
    <VStack p={8}>
      <IconButton
        icon={useColorModeValue(<FaSun />, <FaMoon />)}
        isRound='true'
        size='lg'
        alignSelf='flex-end'
        onClick={toggleColorMode}
        aria-label="Toggle color mode"
      />
      <Box w="100%" p={4} bg={useColorModeValue('white', 'gray.800')} boxShadow="md">
        <Input placeholder="Add a new note" value={input} onChange={(e) => setInput(e.target.value)} />
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addNote} mt={2}>
          Add Note
        </Button>
      </Box>
      {notes.map(note => (
        <Note key={note.id} note={note} onDelete={deleteNote} onEdit={editNote} />
      ))}
    </VStack>
  );
};

export default Index;