<?php

namespace App\Filament\Resources\Announcements\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class AnnouncementForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                \Filament\Forms\Components\RichEditor::make('message')
                    ->required()
                    ->columnSpanFull(),
                \Filament\Forms\Components\Select::make('target_audience')
                    ->label('Target Roles (Visible to)')
                    ->multiple()
                    ->options([
                        'Admin' => 'Admin',
                        'Governance' => 'Governance',
                        'Country Coordinator' => 'Country Coordinator',
                        'Site Investigator' => 'Site Investigator',
                        'Data Abstractor' => 'Data Abstractor',
                        'Viewer' => 'Viewer',
                        'all' => 'All Authenticated Users',
                    ])
                    ->preload()
                    ->columnSpanFull(),
                \Filament\Forms\Components\DateTimePicker::make('publish_date')
                    ->default(now()),
                \Filament\Forms\Components\DateTimePicker::make('expiry_date'),
            ]);
    }
}
