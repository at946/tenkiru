import { Room } from '@/class/room';
import { Table } from '@/class/table';
import { Card } from '@/class/card';
import { useAppSelector } from '@/store/hooks';
import { useMemo } from 'react';
import { Cards } from '@/class/cards';

const useRoom = (): Room => {
  const room = useAppSelector((state) => state.room.room);
  const instantiatedRoom = useMemo(() => {
    const cards: Cards = new Cards();
    room.table.cards.cards.forEach((card) => cards.addCard(new Card(card.playerId, card.value)));
    const table: Table = new Table(cards, room.table.isOpenCards);
    return new Room(room.id, table, room.deckType);
  }, [room]);
  return instantiatedRoom;
};

export default useRoom;
