<?php

namespace App\Filament\Resources\SystemSettings\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class SystemSettingInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('key'),
                TextEntry::make('value')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('group'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
